import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card className="w-full" style={{maxWidth: '32rem'}}>
        <CardHeader>
          <div className="d-flex align-items-center gap-3 mb-4">
            <AlertCircle className="text-destructive" style={{width: '32px', height: '32px'}} />
            <CardTitle className="h2 mb-0">404 Page Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted">
            Did you forget to add the page to the router?
          </p>
          <div className="d-flex gap-2 mt-4">
            <Button onClick={() => window.history.back()}>Go Back</Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>Home</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}