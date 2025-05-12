
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DustSettingsProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  autoRefresh: boolean;
  onAutoRefreshChange: (checked: boolean) => void;
}

export const DustSettings = ({
  threshold,
  onThresholdChange,
  autoRefresh,
  onAutoRefreshChange
}: DustSettingsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Dust Settings</h3>
      <Card className="border border-blue-800/30 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="dust-threshold">Define Dust Threshold</Label>
                <span className="font-mono">${threshold.toFixed(2)}</span>
              </div>
              <Slider
                id="dust-threshold"
                min={0}
                max={5}
                step={0.01}
                value={[threshold]}
                onValueChange={(values) => onThresholdChange(values[0])}
                className="py-4"
              />
              <p className="text-sm text-muted-foreground">
                Balances below this value will be considered as dust
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="auto-refresh" 
                checked={autoRefresh}
                onCheckedChange={(checked) => 
                  onAutoRefreshChange(checked as boolean)
                }
              />
              <Label 
                htmlFor="auto-refresh" 
                className="text-sm font-normal cursor-pointer"
              >
                Automatically refresh balances
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
