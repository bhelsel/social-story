import classes from "./ChatMessages.module.css";
import { User, Bot } from "lucide-react";

function MessageBubble({ message }) {
  const isUser = message.sender === "user";
  return (
    <div
      className={`${classes.messageWrapper} ${
        isUser ? classes.messageWrapperUser : classes.messageWrapperBot
      }`}
    >
      <div
        className={`${classes.messageContainer} ${
          isUser ? classes.messageContainerUser : classes.messageContainerBot
        }`}
      >
        <div
          className={`${classes.avatar} ${
            isUser ? classes.avatarUser : classes.avatarBot
          }`}
        >
          {isUser ? (
            <User className={classes.icon} />
          ) : (
            <Bot className={classes.icon} />
          )}
        </div>
        <div
          className={`${classes.messageBubble} ${
            isUser ? classes.messageBubbleUser : classes.messageBubbleBot
          }`}
        >
          {message.isMarkdown ? (
            <div
              className={classes.prose}
              dangerouslySetInnerHTML={{
                __html: message.content
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(/\n/g, "<br>"),
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: message.content.replace(/\n/g, "<br>"),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
