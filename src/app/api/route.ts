import { NextRequest, NextResponse } from "next/server";

let sessions: Record<string, boolean> = {};

function getRandomInt() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(request: NextRequest) {
  let code = getRandomInt();
  while (sessions[code.toString()]) code = getRandomInt();
  sessions[code.toString()] = true;

  setTimeout(() => {
    delete sessions[code.toString()];
  }, 3600000);

  return NextResponse.json({ code });
}