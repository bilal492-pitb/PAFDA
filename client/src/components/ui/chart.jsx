import React from 'react';
import * as RechartsPrimitive from 'recharts';

const THEMES = { light: "", dark: ".dark" };

export function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <div
      data-chart={chartId}
      className={`d-flex justify-content-center text-xs ${className || ''}`}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      <RechartsPrimitive.ResponsiveContainer>
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  );
}

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig.map(([key, itemConfig]) => {
                const color = itemConfig.theme?.[theme] || itemConfig.color;
                return color ? `--color-${key}: ${color};` : null;
              }).join('\n')}
            }
          `).join('\n'),
      }}
    />
  );
};

export const ChartTooltip = RechartsPrimitive.Tooltip;

export const ChartTooltipContent = React.forwardRef((props, ref) => {
  // Implementation would go here - simplified for brevity
  return null;
});

export const ChartLegend = RechartsPrimitive.Legend;

export const ChartLegendContent = React.forwardRef((props, ref) => {
  // Implementation would go here - simplified for brevity
  return null;
});

function getPayloadConfigFromPayload(config, payload, key) {
  if (!payload || typeof payload !== 'object') return undefined;
  const payloadPayload = payload.payload;
  let configLabelKey = key;

  if (key in payload && typeof payload[key] === 'string') {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string') {
    configLabelKey = payloadPayload[key];
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}