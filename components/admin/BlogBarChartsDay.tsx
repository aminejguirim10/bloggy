"use client"
import { useEffect } from "react"
import { Chart } from "chart.js"

function BlogBarChartsDay({ data }: { data: Number[] }) {
  useEffect(() => {
    var ctx = (
      document.getElementById("myChartBar") as HTMLCanvasElement
    ).getContext("2d")
    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "bar",
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
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132,0.5)",
              borderWidth: 2,
            },
          ],
        },
      })
    }
  }, [data]) //data is the prop passed to the component to render the chart in case of change in data

  return (
    <>
      {/* Bar chart */}
      <h1 className="mx-auto mt-10 text-xl font-bold capitalize md:text-2xl">
        Bar chart of Blogs created by day of week
      </h1>
      <div className="mx-auto my-auto -mt-[100px] flex h-screen w-[1100px]">
        <div className="my-auto h-fit w-full rounded-xl border border-gray-400 pt-0 shadow-xl">
          {/* Canva id must be unique if you have multiple Charts */}
          <canvas id="myChartBar"></canvas>
        </div>
      </div>
    </>
  )
}

export default BlogBarChartsDay
