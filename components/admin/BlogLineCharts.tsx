"use client"
import { useEffect, useState } from "react"
import { Chart } from "chart.js"

function BlogLineCharts({ data }: { data: Number[] }) {
  const [currentWeek, setCurrentWeek] = useState<string[]>([])

  useEffect(() => {
    const currentDate = new Date()
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const currentWeek = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(
        currentDate.getTime() - (currentDate.getDay() - i) * 24 * 60 * 60 * 1000
      )
      currentWeek.push(
        days[day.getDay()] +
          " " +
          day.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      )
    }

    setCurrentWeek(currentWeek)
  }, [])

  useEffect(() => {
    var ctx = (
      document.getElementById("myChartLine") as HTMLCanvasElement
    ).getContext("2d")
    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: currentWeek,
          datasets: [
            {
              data: data.map((num) => num.valueOf()),
              label: "Created",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            },
          ],
        },
      })
    }
  }, [currentWeek, data])

  return (
    <>
      {/* line chart */}
      <h1 className="mx-auto mt-10 text-xl font-bold capitalize md:text-2xl">
        Line chart of Blogs created by day of current week
      </h1>
      <div className="mx-auto my-auto flex h-screen w-[1100px]">
        <div className="my-auto h-fit w-full rounded-xl border border-gray-400 pt-0 shadow-xl">
          <canvas id="myChartLine"></canvas>
        </div>
      </div>
    </>
  )
}

export default BlogLineCharts

/* "use client";
import { useEffect } from "react";
import { Chart } from "chart.js";
function BlogLineCharts({ data }: { data: Number[] }) {
  useEffect(() => {
    var ctx = (
      document.getElementById("myChartLine") as HTMLCanvasElement
    ).getContext("2d");
    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              data: data.map((num) => num.valueOf()),
              label: "Created",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            },
            //you can add more datasets here if you want with same logic as above
          ],
        },
      });
    }
  }, [data]); //data is the prop passed to the component to render the chart in case of change in data
  return (
    <>
      <h1 className="mx-auto mt-10 font-bold text-xl md:text-2xl capitalize">
        Line chart of Blogs created by day of week
      </h1>
      <div className="w-[1100px]  h-screen flex mx-auto my-auto -mt-16 ">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="myChartLine"></canvas>
        </div>
      </div>
    </>
  );
}
// line chart
export default BlogLineCharts;
 */
