import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Path to the AI model directory - adjusted to match your structure
    const modelDir = path.join(process.cwd(), "AI_Model/server1");
    
    return new Promise((resolve, reject) => {
      const python = spawn("python", [
        path.join(modelDir, "model.py"),
        JSON.stringify(data),
      ]);
      
      let result = "";
      let error = "";
      
      python.stdout.on("data", (data) => {
        result += data.toString();
      });
      
      python.stderr.on("data", (data) => {
        error += data.toString();
      });
      
      python.on("close", (code) => {
        if (code !== 0) {
          console.error("Python process exited with code", code);
          console.error("Error:", error);
          return resolve(
            NextResponse.json({ error: "AI processing failed" }, { status: 500 })
          );
        }
        
        try {
          const parsedResult = JSON.parse(result);
          return resolve(NextResponse.json(parsedResult));
        } catch (e) {
          console.error("Failed to parse result:", result);
          return resolve(
            NextResponse.json({ error: "Failed to parse result" }, { status: 500 })
          );
        }
      });
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
