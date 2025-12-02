import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';
import { Play, ExternalLink, X } from 'lucide-react';

// Function to extract YouTube video ID from URL
const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Sample video data - you can move this to a separate file or fetch from an API
const videos = [
    {
        id: 'video1',
        title: 'PAFDA | Documentary | Objective & Mission',
        description: 'An introduction to PAFDA and its mission',
        youtubeUrl: 'https://www.youtube.com/watch?v=OtFzCP9Ed4g',
        duration: '2:45'
    },
    {
        id: 'video2',
        title: 'PAFDA | World Food Day | 16th October 2025',
        description: 'A tour of PAFDA state-of-the-art testing facilities',
        youtubeUrl: 'https://www.youtube.com/watch?v=JOPqdsuzrFk',
        duration: '3:20'
    },
    // Add more videos as needed
];

export default function Videos() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* Hero Banner */}
            <section className="position-relative" style={{ height: '300px' }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                    <img
                        src="pafdalab.JPG"
                        alt="Videos"
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
                </div>

                <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{ maxWidth: '64rem' }}>
                    <h1 className="display-1 fw-bold mb-4">Videos</h1>
                    <p className="fs-4 text-white-90">
                        Watch our latest videos and stay updated with PAFDA
                    </p>
                </div>
            </section>

            {/* Videos Grid */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        {videos.map((video) => {
                            const videoId = getYoutubeId(video.youtubeUrl);
                            return (
                                <div className="col-md-6" key={video.id}>
                                    <Card className="h-100 shadow-sm">
                                        <div className="position-relative">
                                            <img
                                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                                className="card-img-top"
                                                alt={video.title}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                            <div
                                                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                                style={{ backgroundColor: 'rgba(0,0,0,0.3)', cursor: 'pointer' }}
                                                onClick={() => setSelectedVideo({...video, youtubeId: videoId})}
                                            >
                                                <div
                                                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{ width: '60px', height: '60px' }}
                                                >
                                                    <Play size={24} className="text-white" />
                                                </div>
                                            </div>
                                            <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 m-2 rounded">
                                                {video.duration}
                                            </div>
                                        </div>
                                        <CardBody>
                                            <CardTitle className="h5">{video.title}</CardTitle>
                                            <CardText className="text-muted">{video.description}</CardText>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => setSelectedVideo({...video, youtubeId: videoId})}
                                                >
                                                    Watch Video
                                                </button>
                                                <a
                                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                >
                                                    <small className="text-muted">
                                                        Watch on YouTube <ExternalLink size={14} className="ms-1" />
                                                    </small>
                                                </a>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 1050,
                        overflow: 'auto'
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <div className="modal-content border-0 bg-transparent">
                            <div className="modal-header border-0 position-absolute top-0 end-0 z-1">
                                <button
                                    type="button"
                                    className="btn-close bg-white"
                                    onClick={() => setSelectedVideo(null)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded"
                                        style={{ border: 'none' }}
                                    ></iframe>
                                </div>
                                <div className="bg-white p-3 rounded-bottom">
                                    <h5 className="mb-1">{selectedVideo.title}</h5>
                                    <p className="text-muted mb-0">{selectedVideo.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}