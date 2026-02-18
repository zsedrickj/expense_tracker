/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react"
import { Tooltip, TooltipProps } from "recharts"

// Type for chart configuration
export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

// Container for chart (adds default padding / styling if needed)
export const ChartContainer: React.FC<{ config: ChartConfig; children: ReactNode }> = ({
  config,
  children,
}) => {
  return <div className="w-full h-64">{children}</div>
}

// Tooltip wrapper
export const ChartTooltip: React.FC<TooltipProps<any, any>> = (props) => {
  return <Tooltip {...props} />
}

// Custom tooltip content component
export const ChartTooltipContent: React.FC<{ indicator?: string; payload?: any }> = ({
  indicator,
  payload,
}) => {
  if (!payload || payload.length === 0) return null

  return (
    <div className="bg-white border rounded-lg p-2 shadow-md">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {indicator && <span className={`w-2 h-2 rounded-full ${indicator}-indicator`} />}
          <span>{item.name}: </span>
          <span className="font-bold">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
