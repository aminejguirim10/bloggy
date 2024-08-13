"use client"
import { useEffect } from "react"
import { Chart } from "chart.js"

function BlogBarChartsMonth({ data }: { data: Number[] }) {
  useEffect(() => {
    var ctx = (
      document.getElementById("myChartBarMonth") as HTMLCanvasElement
    ).getContext("2d")
    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              data: data.map((num) => num.valueOf()),
              label: "Created",
              borderColor: "rgb(102, 179, 81)",
              backgroundColor: "rgb(102, 179, 81,0.5)",
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
        Bar chart of Blogs created by month
      </h1>
      <div className="mx-auto my-auto -mt-[100px] flex h-screen w-[1100px]">
        <div className="my-auto h-fit w-full rounded-xl border border-gray-400 pt-0 shadow-xl">
          {/* Canva id must be unique if you have multiple Charts */}
          <canvas id="myChartBarMonth"></canvas>
        </div>
      </div>
    </>
  )
}

export default BlogBarChartsMonth
