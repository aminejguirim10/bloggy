"use client";

import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const CopyTextBtn = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("");
  const copyText = () => {
    setText(content);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      onClick={copyText}
      className="border px-1 py-1 rounded-md border-gray-500 hover:border-gray-300 hover:bg-zinc-200"
    >
      {copied ? (
        <TiTick className="text-green-700 hover:cursor-pointer" />
      ) : (
        <FaRegCopy className="text-green-900 hover:cursor-pointer" />
      )}
    </div>
  );
};

export default CopyTextBtn;
