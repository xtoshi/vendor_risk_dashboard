'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    overdueAssessments: true,
    highRiskAlerts: true,
    weeklyReports: false,
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Settings"
        subtitle="Manage your account and notification preferences"
      />

      <div className="p-6 max-w-3xl space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Full name" defaultValue="Admin User" />
            <Field label="Email" defaultValue="admin@company.com" type="email" />
            <Field label="Role" defaultValue="Administrator" readOnly />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Toggle
              label="Overdue assessment alerts"
              description="Notify when an assessment passes its due date"
              checked={notifications.overdueAssessments}
              onChange={(v) =>
                setNotifications((n) => ({ ...n, overdueAssessments: v }))
              }
            />
            <Separator />
            <Toggle
              label="High-risk vendor alerts"
              description="Notify when a vendor is flagged as high risk"
              checked={notifications.highRiskAlerts}
              onChange={(v) =>
                setNotifications((n) => ({ ...n, highRiskAlerts: v }))
              }
            />
            <Separator />
            <Toggle
              label="Weekly summary reports"
              description="Receive a weekly portfolio risk summary"
              checked={notifications.weeklyReports}
              onChange={(v) =>
                setNotifications((n) => ({ ...n, weeklyReports: v }))
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Current password" type="password" placeholder="••••••••" />
            <Field label="New password" type="password" placeholder="•••••••••" />
            <Button variant="outline" size="sm">
              Change password
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave}>Save changes</Button>
          {saved && (
            <span className="text-sm text-emerald-500">Settings saved</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = 'text',
  placeholder,
  readOnly,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 read-only:opacity-60"
      />
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
