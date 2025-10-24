import {useEffect} from "react";
import {useQueryClient} from "react-query";
import {io} from "socket.io-client";

import {useAppStore} from "@/core/common/presentation/state/store";
import {BASE_URL} from "@/core/constants/env.constants";

const useSync = () => {
    const {auth} = useAppStore();
    const token = auth?.accessToken;
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!token) return;

        const base = BASE_URL || "http://localhost:3000";
        const socket = io(`${base}/sync`, {
            auth: {token},
            transports: ["websocket"],
        });

        socket.on("connect", () =>
            console.info("✅ Connected to OrbS8 sync gateway")
        );

        socket.on("connect_error", (err) => {
            console.error("❌ Sync socket connection error:", err?.message || err);
        });

        // When server notifies about new notifications explicitly
        socket.on("notifications", () => {
            queryClient.invalidateQueries(["notifications"]);
        });

        socket.on("sync_started", () => {
            // Refresh notifications and sync status when sync starts
            queryClient.invalidateQueries(["notifications"]);
            queryClient.invalidateQueries(["sync-status"]);
        });

        socket.on("sync_completed", () => {
            // Refresh notifications and sync status when sync completes
            queryClient.invalidateQueries(["notifications"]);
            queryClient.invalidateQueries(["sync-status"]);
        });

        return () => {
            socket.disconnect();
        };
    }, [token, queryClient]);
};

export default useSync;