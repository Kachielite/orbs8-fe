import {Loader2} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {io} from "socket.io-client";

import {GlobalLoader} from "@/core/common/presentation/components/global-loader";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/core/common/presentation/components/ui/card";
import {Progress} from "@/core/common/presentation/components/ui/progress";
import {useAppStore} from "@/core/common/presentation/state/store";
import useSyncEmail from "@/features/email/presentation/state/hooks/use-sync-email";
import {SyncEmailSchemaType} from "@/features/email/presentation/validation/email-sync";

function SyncEmailAlert({setStep}:{setStep: (step: number) => void}) {
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
      setStep(4)
    });

    return () => {
      socket.disconnect();
    };
  }, [setStep, token]);

  if(isSyncingEmail) {
      return <GlobalLoader show={isSyncingEmail} />
  }

  if(!token) {
      return <Navigate to="/login" replace />
  }

    return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <div className="bg-primary/10 p-3 rounded-full mb-2">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>

        <CardTitle className="text-2xl lg:text-3xl">
          Syncing your bank alerts ✨
        </CardTitle>

        <CardDescription className="flex flex-col gap-3 text-sm lg:text-base items-start w-full">
          OrbS8 is scanning your inbox for bank notifications and organizing your transactions in real time.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8 items-center">
        <Progress value={progress} className="h-3 rounded-full" />
        {status === "syncing" && (
          <p className="text-sm text-muted-foreground mt-3">
            Syncing... {progress}%
          </p>
        )}
      </CardContent>
    </>
    )
}

export default SyncEmailAlert
