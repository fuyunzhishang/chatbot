import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  const messages = [{ role: "system", content: '' }];  
  async function onSubmit(event) {
    event.preventDefault();
    messages.push({ role: "user", content: userInput });  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer  
        },
        body: JSON.stringify(messages),
      });

      console.log(response, 1111)

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>赛博海王</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="logo.jpeg" className={styles.icon} />
        <h3>情感聊天对话生成</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="请输入的问题"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="生成对话" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
