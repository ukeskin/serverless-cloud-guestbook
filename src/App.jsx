import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [messages, setMessages] = useState([]);
  const [formState, setFormState] = useState({
    username: "",
    message: "",
  });

  const getAllMessages = async () => {
    await axios.get("api/messages").then((res) => {
      setMessages(res.data.items);
      console.log(res.data.items);
    });
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("api/messages", formState).then(() => {
      getAllMessages();
    });
  };

  return (
    <div className="px-6 relative">
      <header className="container mx-auto h-24 flex items-center">
        <h2 className="text-xl text-lime-500 font-semibold">Guest Book</h2>
      </header>
      <main className="container mx-auto mt-24">
        <div className="rounded-xl bg-lime-100 w-full p-2">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              name="username"
              onChange={handleChange}
              className="border border-lime-500 rounded-lg p-2 w-full"
              type="text"
              placeholder="username"
            />
            <textarea
              name="message"
              onChange={handleChange}
              className="border border-lime-500 rounded-lg p-2 w-full"
              type="text"
              placeholder="Message"
            />
            <button
              onClick={handleSubmit}
              className="font-bold bg-lime-500 text-white rounded-lg py-2 px-5"
            >
              Send
            </button>
          </div>
        </div>
        {messages?.map((message) => (
          <div
            key={message.key}
            className="mt-4 p-2 rounded border hover:border-lime-100"
          >
            <h3 className="text-lg text-lime-500 font-semibold">
              {message.value.username}
            </h3>
            <p>{message.value.message}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
