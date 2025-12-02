import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { Alert, Button } from "react-bootstrap";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";
import { Dialog, DialogContent } from "../components/ui/dialog";

import React, { useState } from 'react';

export default function NewsDetail() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["/api/news", slug],
    queryFn: () => fetch(`/api/news/${slug}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <section className="position-relative" style={{ height: '400px' }}>
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-secondary" style={{ opacity: 0.1 }} />
        </section>
        <section className="py-5 bg-light">
          <div className="container" style={{ maxWidth: '64rem' }}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h1 className="h1 fw-bold">Article Not Found</h1>
          <p className="text-muted">The article you're looking for doesn't exist.</p>
          <Link href="/news">
            <Button variant="primary">
              <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner with Article Image */}
      <section className="position-relative" style={{ height: '400px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = '/placeholder.jpg'; // Fallback image
            }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{ maxWidth: '64rem' }}>
          <span className="badge bg-primary mb-4" style={{ backdropFilter: 'blur(8px)' }}>
            <Calendar className="me-1" style={{ width: '12px', height: '12px' }} />
            {article.date}
          </span>
          <h1 className="display-4 fw-bold" data-testid="text-article-title">{article.title}</h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '64rem' }}>
          <Link href="/news">
            <Button variant="link" className="mb-4 text-decoration-none" data-testid="button-back-to-news">
              <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
              Back to News
            </Button>
          </Link>

          {/* Main Content */}
          <article className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Gallery Section */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="mt-5">
                <h3 className="h5 mb-4">Gallery</h3>
                <div className="row g-3">
                  {article.gallery.map((image, index) => (
                    <div
                      className="col-md-4 col-6"
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="ratio ratio-16x9">
                        <img
                          src={image.url}
                          alt={image.caption || `Gallery image ${index + 1}`}
                          className="img-fluid rounded shadow-sm"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      </div>
                      {image.caption && (
                        <p className="text-muted text-center small mt-2">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Image Preview Modal - Moved outside the article */}
            <Dialog
              show={!!selectedImage}
              onHide={() => setSelectedImage(null)}
              className="modal-dialog-centered modal-dialog-scrollable"
            >
              <DialogContent>
                {selectedImage && article?.gallery?.length > 0 && (
                  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', position: 'relative' }}>
                    {/* Previous Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = article.gallery.findIndex(img => img.url === selectedImage.url);
                        const prevIndex = (currentIndex - 1 + article.gallery.length) % article.gallery.length;
                        setSelectedImage(article.gallery[prevIndex]);
                      }}
                      className="btn btn-dark rounded-circle position-absolute start-0 ms-3"
                      style={{ width: '50px', height: '50px', zIndex: 10 }}
                      aria-label="Previous image"
                    >
                      &larr;
                    </button>

                    <div className="position-relative">
                      <img
                        src={selectedImage.url}
                        alt={selectedImage.caption || 'Preview'}
                        className="img-fluid"
                        style={{ maxHeight: '80vh', maxWidth: '80vw', display: 'block', margin: '0 auto' }}
                      />
                      {selectedImage.caption && (
                        <div className="text-center text-white bg-dark bg-opacity-75 p-2 position-absolute bottom-0 start-0 end-0">
                          {selectedImage.caption}
                        </div>
                      )}
                    </div>

                    {/* Next Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = article.gallery.findIndex(img => img.url === selectedImage.url);
                        const nextIndex = (currentIndex + 1) % article.gallery.length;
                        setSelectedImage(article.gallery[nextIndex]);
                      }}
                      className="btn btn-dark rounded-circle position-absolute end-0 me-3"
                      style={{ width: '50px', height: '50px', zIndex: 10 }}
                      aria-label="Next image"
                    >
                      &rarr;
                    </button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </article>
        </div>
      </section>
    </div>
  );
}
