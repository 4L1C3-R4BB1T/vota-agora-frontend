"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useApi from "@/core/hooks/useApi"

export const description = "An interactive line chart"

// const chartData = [
//   { date: "2024-04-01", desktop: 222, mobile: 150 },
// ]

const chartConfig = {
  views: {
    label: "Total",
  },
  publicConsultations: {
    label: "Criadas",
    color: "var(--primary-color)",
  },
  votes: {
    label: "Votadas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface CreatedByMonth {
  year: number;
  month: number;
  day: number;
  totalCreated: number;
}

interface ChartData {
  date: string;
  publicConsultations: number;
  votes: number;
}

interface ChatDataAPIResponse {
  publicConsultationCreatedByMonth: CreatedByMonth[];
  votesCreatedByMonth: CreatedByMonth[];
}

function DashboardChart() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("publicConsultations")
  const [chartData, setChartData] = React.useState<ChartData[] | null>(null);
  const { request } = useApi();

  React.useEffect(() => {
    if (chartData) return;
    const getChartData = async () => {
      const data = await request<ChatDataAPIResponse>({
        endpoint: '/public-consultation/stats/by-month',
      });


      //{ date: "2024-04-01", desktop: 222, mobile: 150 },
      const mapToChartDataPublicConsultation = (({ year, month, day, totalCreated }: CreatedByMonth) => {
        return {
          date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          publicConsultations: totalCreated,
          votes: 0,
        };
      });

      const mapToChartDataVote = (({ year, month, day, totalCreated }: CreatedByMonth) => {
        return {
          date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          votes: totalCreated,
          publicConsultations: 0,
        };
      });

      const set1 = data?.publicConsultationCreatedByMonth.map(mapToChartDataPublicConsultation) ?? [];
      const set2 = data?.votesCreatedByMonth.map(mapToChartDataVote) ?? [];

      const chartData = [
        ...set1,
        ...set2
      ];


      setChartData(chartData);
    };
    getChartData()
  }, [request, chartData]);

  const total = React.useMemo(
    () => ({
      publicConsultations: chartData?.reduce((acc, curr) => acc + curr.publicConsultations, 0) ?? 0,
      votes: chartData?.reduce((acc, curr) => acc + curr.votes, 0) ?? 0,
    }),
    [chartData]
  )

  if (!chartData || !chartData.length) {
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-col items-center">
              <i className="fas fa-chart-bar text-brand-primary text-6xl mb-4"></i>
              <span className="text-lg font-medium text-brand-primary">
                Não há nenhum dado para exibir
              </span>
            </div>
        </div>
        );
    }
    
  

  return (
    <Card className="border border-brand-primary border-opacity-40">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex text-2xl flex-1 text-brand-primary flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Informação</CardTitle>
          <CardDescription>
            Exibindo o total de consultas criadas e votadas no mês
          </CardDescription>
        </div>
        <div className="flex">
          {["publicConsultations", "votes"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-base text-brand-primary">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl text-brand-primary">
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData ?? []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChart;