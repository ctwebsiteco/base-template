"use client"

import { useEffect } from "react"

const RUM_ENDPOINT = "https://crm-api-1016182607730.us-east1.run.app/api/v1/rum/beacon"

function getDeviceType(): string {
  if (typeof window === "undefined") return "desktop"
  const w = window.innerWidth
  if (w < 768) return "mobile"
  if (w < 1024) return "tablet"
  return "desktop"
}

function getConnectionType(): string {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string }
  }
  return nav.connection?.effectiveType || "unknown"
}

export function RumClient() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_RUM_TOKEN
    if (!token) return

    import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      function sendMetric(metric: { name: string; value: number; rating?: string; delta: number; navigationType?: string }) {
        const body = JSON.stringify({
          token,
          page_path: window.location.pathname,
          metric_name: metric.name.toLowerCase(),
          value: metric.value,
          rating: metric.rating || "good",
          delta: metric.delta,
          navigation_type: metric.navigationType || "navigate",
          device_type: getDeviceType(),
          connection_type: getConnectionType(),
        })

        if (navigator.sendBeacon) {
          navigator.sendBeacon(RUM_ENDPOINT, body)
        } else {
          fetch(RUM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
          }).catch(() => {})
        }
      }

      onCLS(sendMetric)
      onFCP(sendMetric)
      onINP(sendMetric)
      onLCP(sendMetric)
      onTTFB(sendMetric)
    }).catch(() => {})
  }, [])

  return null
}
