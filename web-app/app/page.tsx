import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";
import { RawPassenger, Passenger } from "../types/titanic";
import Dashboard from "../components/Dashboard";

export default async function Home() {
  let passengers: Passenger[] = [];

  try {
    // Resolve absolute path to local Titanic CSV
    const csvPath = path.join(process.cwd(), "../data/Titanic-Dataset.csv");
    const fileContent = await fs.readFile(csvPath, "utf-8");

    // Parse CSV on the Server
    const parsed = Papa.parse<RawPassenger>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    // Map Raw CSV row to typed Passenger object
    passengers = parsed.data.map((row) => {
      const age = row.Age && row.Age.trim() !== "" ? parseFloat(row.Age) : null;
      const fare = row.Fare && row.Fare.trim() !== "" ? parseFloat(row.Fare) : 0;
      const sibSp = parseInt(row.SibSp) || 0;
      const parch = parseInt(row.Parch) || 0;
      
      return {
        passengerId: parseInt(row.PassengerId) || 0,
        survived: row.Survived === "1",
        pclass: parseInt(row.Pclass) || 0,
        name: row.Name || "",
        sex: row.Sex === "female" ? "female" : "male",
        age: age,
        sibSp: sibSp,
        parch: parch,
        ticket: row.Ticket || "",
        fare: fare,
        cabin: row.Cabin || "",
        embarked: row.Embarked || "",
        familySize: sibSp + parch + 1,
      };
    });
  } catch (error) {
    console.error("Error reading or parsing Titanic dataset:", error);
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100">
      <Dashboard initialPassengers={passengers} />
    </main>
  );
}
