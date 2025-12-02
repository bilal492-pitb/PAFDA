import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Download, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export default function NotificationPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    youtubeUrl: "https://www.youtube.com/watch?v=OtFzCP9Ed4g", // Set to "" to hide video
    title: "New Career Opportunity!",
    message: "We're hiring for multiple positions. Click below to view job advertisements.",
    showButton: true,
    buttonText: "View Job Advertisements",
    buttonLink: "/careers",
    showEveryTime: false,
    storageKey: "pafda-notification-view-count"
  };

  const hasIncremented = useRef(false);

  useEffect(() => {
    // Check view count
    const currentCount = parseInt(localStorage.getItem(config.storageKey) || '0', 10);

    if (currentCount < 2) {
      // Only increment if we haven't done so in this mount (handling StrictMode)
      if (!hasIncremented.current) {
        // Delay showing to match original behavior (1000ms)
        const timer = setTimeout(() => {
          setIsOpen(true);
          // Increment and save
          localStorage.setItem(config.storageKey, (currentCount + 1).toString());
          hasIncremented.current = true;
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    window.location.href = config.buttonLink;
    handleClose();
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/);
    return (match && match[1]?.length === 11) ? match[1] : null;
  };

  const videoId = getYoutubeId(config.youtubeUrl);

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, backdropFilter: 'blur(4px)' }}
      onClick={handleClose}>
      <div style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <Card className="shadow-2xl border-0">
          <CardContent className="p-0 position-relative">
            {/* FIXED: Higher z-index and solid background for visibility */}
            <Button variant="ghost" size="sm"
              className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
              onClick={handleClose}
              style={{
                width: '44px',
                height: '44px',
                zIndex: 10000, // Higher than video
                top: '15px',
                right: '15px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '2px solid white'
              }}>
              <X size={22} className="text-dark" />
            </Button>

            {videoId && (
              <div className="ratio ratio-16x9">
                <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  allowFullScreen style={{ border: 'none' }} />
              </div>
            )}

            <div className="p-5">
              <div className="d-flex align-items-start gap-3 mb-4">
                <AlertCircle className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="fw-bold mb-2">{config.title}</h4>
                  <p className="text-muted mb-0">{config.message}</p>
                </div>
              </div>
              {config.showButton && (
                <div className="d-flex justify-content-center">
                  <Button variant="primary" size="lg" className="d-inline-flex align-items-center gap-2"
                    onClick={handleButtonClick}>
                    {config.buttonText.includes('Download') ? <Download size={20} /> : <Play size={20} />}
                    {config.buttonText}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}