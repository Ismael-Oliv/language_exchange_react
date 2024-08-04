import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { api } from "../../api";
import { useAuth } from "../../hooks/Auth";

type Users = {
  id: string;
  name: string;
  online: boolean;
};

interface OnlineProps {
  handleListMessage: (id: string) => void;
  selectedUser: string;
}

export function OnlineUsers({ handleListMessage, selectedUser }: OnlineProps) {
  const [users, setUsers] = useState<Users[]>([]);
  const { socket } = useAuth();

  useEffect(() => {
    api.get("/list").then((response) => {
      setUsers(response.data);
    });
  }, []);

  useEffect(() => {
    if (socket.active) {
      socket.on("online", (data) => {
        console.log("socketData", data);
        console.log(users);
        setUsers((prev) => {
          return prev.map((user) => {
            return user.id === data.users.id ? { ...user, online: true } : user;
          });
        });
      });
    }

    return () => {
      if (socket.active) {
        socket.removeListener("online");
      }
    };
  }, [socket]);

  return (
    <aside style={{ display: "flex", flexDirection: "column" }}>
      {users.map((user) => {
        return (
          <Button
            key={user.id}
            onClick={() => {
              handleListMessage(user.id);
            }}
            style={{ border: `${selectedUser === user.id ? "1px solid gray" : ""}` }}
          >
            <p>{user.name}</p>
            <p>{user.online ? "*" : ""}</p>
          </Button>
        );
      })}
    </aside>
  );
}
