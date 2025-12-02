import { useQuery } from "@tanstack/react-query";
import NewsCard from "../components/NewsCard.jsx";
import React from 'react';

export default function News() {
  const { data: newsItems, isLoading, error } = useQuery({
    queryKey: ["/api/news"],
    queryFn: () => fetch("/api/news").then(res => res.json()),
  });

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{height: '300px'}}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop"
            alt="News and Highlights"
            className="w-100 h-100"
            style={{objectFit: 'cover'}}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{maxWidth: '64rem'}}>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">News & Highlights</h1>
          <p className="fs-4 text-white-90">
            Latest updates and achievements from PAFDA
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-5 bg-light">
        <div className="container">
          {error && (
            <div className="text-center py-5">
              <p className="text-muted">Failed to load news articles. Please try again later.</p>
            </div>
          )}

          {isLoading && (
            <div className="row g-4">
              {[...Array(6)].map((_, i) => (
                <div className="col-md-6 col-lg-4" key={i}>
                  <div className="card">
                    <div className="card-body">
                      <div className="placeholder-glow">
                        <div className="placeholder bg-secondary" style={{height: '200px', width: '100%'}}></div>
                        <div className="placeholder bg-secondary rounded mt-3" style={{height: '24px', width: '75%'}}></div>
                        <div className="placeholder bg-secondary rounded mt-2" style={{height: '16px', width: '100%'}}></div>
                        <div className="placeholder bg-secondary rounded mt-2" style={{height: '16px', width: '66%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {newsItems && newsItems.length > 0 && (
            <div className="row g-4">
              {newsItems.map((item) => (
                <div className="col-md-6 col-lg-4" key={item.slug}>
                  <NewsCard {...item} />
                </div>
              ))}
            </div>
          )}

          {newsItems && newsItems.length === 0 && !isLoading && (
            <div className="text-center py-5">
              <p className="text-muted">No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}