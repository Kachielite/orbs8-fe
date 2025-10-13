import {CheckCircle2, Loader2} from "lucide-react";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {io} from "socket.io-client";

import {GlobalLoader} from "@/core/common/presentation/components/global-loader";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/core/common/presentation/components/ui/card";
import {Progress} from "@/core/common/presentation/components/ui/progress";
import {useAppStore} from "@/core/common/presentation/state/store";
import useSyncEmail from "@/features/email/presentation/state/hooks/use-sync-email";
import {SyncEmailSchemaType} from "@/features/email/presentation/validation/email-sync";

function SyncEmailAlert() {
  const {auth} = useAppStore();
  const {isSyncingEmail} = useSyncEmail()
  const token = auth?.accessToken


  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | syncing | done

  useEffect(() => {
    const socket = io("http://localhost:3000/sync", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => console.info("✅ Connected to OrbS8 sync gateway"));

    socket.on("sync_started", () => {
      setStatus("syncing");
      setProgress(0);
    });

    socket.on("sync_progress", (data: SyncEmailSchemaType) => {
      const percent = data.progress ? data.progress : 0;
      setProgress(percent);
    });

    socket.on("sync_completed", () => {
      setProgress(100);
      setStatus("done");
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  if(isSyncingEmail) {
      return <GlobalLoader show={isSyncingEmail} />
  }

  if(!token) {
      return <Navigate to="/login" replace />
  }

    return (
    <Card className="max-w-md mx-auto text-center py-6 px-4">
      <CardHeader className="flex flex-col items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full mb-2">
          {status === "done" ? (
            <CheckCircle2 className="w-8 h-8 text-primary" />
          ) : (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          )}
        </div>

        <CardTitle className="text-2xl font-semibold">
          {status === "done"
            ? "Sync Complete 🎉"
            : "Syncing your bank alerts ✨"}
        </CardTitle>

        <CardDescription className="text-muted-foreground text-base">
          {status === "done"
            ? "OrbS8 has successfully synced your transactions! You will now be able to view your organized bank alerts and insights."
            : "OrbS8 is scanning your inbox for bank notifications and organizing your transactions in real time."}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-6">
        <Progress value={progress} className="h-3 rounded-full" />
        {status === "syncing" && (
          <p className="text-sm text-muted-foreground mt-3">
            Syncing... {progress}%
          </p>
        )}
        {status === "done" && (
          <p className="text-sm text-muted-foreground mt-3">
            All caught up! 🎯
          </p>
        )}
      </CardContent>
    </Card>
    )
}

export default SyncEmailAlert
