import "./style.sass";
import { useCallback, useEffect, useState } from "react";
import { OnlineUsers } from "../../components/OnlineUsers";
import { Button, Container, Input } from "@mui/material";
import { Preview, SendSharp } from "@mui/icons-material";
import { api } from "../../api";
import { useAuth } from "../../hooks/Auth";

export function Main() {
  const [chat, setChat] = useState<any>([]);
  const [text, setText] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const { signOut, socket } = useAuth();

  const sendMessage = useCallback(() => {
    socket.emit("send_message", { receiver_id: selectedUser, message: text });
  }, [text]);

  const handleListMessage = useCallback((id: string) => {
    setSelectedUser(id);
    api.get("/chat", { params: { id } }).then((res) => {
      setChat(res.data);
    });
  }, []);

  useEffect(() => {
    if (socket.active) {
      socket.on("update", (data) => {
        setChat((prev: any) => [...prev, data.message]);
      });
    }

    return () => {
      if (socket.active) {
        socket.removeListener("update");
      }
    };
  }, []);

  return (
    <Container style={{ display: "flex", height: "100vh" }}>
      <button onClick={signOut}>Sair</button>
      <OnlineUsers handleListMessage={handleListMessage} selectedUser={selectedUser} />

      <section className="sectionContainer">
        <div className="chatContainer">
          {chat.map((message: any) => {
            return <p key={message.id}>{message.message}</p>;
          })}
        </div>

        <div className="messageArea">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Placeholder" />
          <Button variant="contained" endIcon={<SendSharp />} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </section>
    </Container>
  );
}
