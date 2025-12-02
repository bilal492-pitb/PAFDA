import { useState } from "react";
import React from 'react';
import { MapPin, Phone, Mail, Clock, User } from "lucide-react";
import { useToast } from "../hooks/use-toast.js";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient.js";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input-otp.jsx";
import { Button } from "../components/ui/button.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { Label } from "../components/ui/label.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/contact", formData);
      
      // Show success toast with auto-close
      toast({
        title: "✅ Message Sent Successfully!",
        description: "Thank you for contacting PAFDA. Our team will get back to you within 24-48 hours.",
        duration: 5000,
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Reset form and show success state
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setSubmitSuccess(true);
      
      // Reset success state after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "❌ Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{ height: '300px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
            alt="Contact Us"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{ maxWidth: '64rem' }}>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">Contact Us</h1>
          <p className="fs-4 text-white-90">
            Get in touch with PAFDA for testing services and inquiries
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Contact Info */}
            <div className="col-lg-4">
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <MapPin className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Address</h3>
                        <p className="small text-muted">
                          Near Thokar Niaz Baig Flyover,<br />
                          Lahore, Punjab,<br />
                          Pakistan
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Phone className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Phone</h3>
                        <p className="small text-muted">
                          +92 (042) 111-PAFDA<br />
                          +92 (042) 99232100
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Mail className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Email</h3>
                        <p className="small text-muted">
                          info@pafda.gop.pk<br />
                          contact@pafda.gop.pk
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Clock className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Working Hours</h3>
                        <p className="small text-muted">
                          Monday - Friday<br />
                          9:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <Card>
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="mb-0">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="row g-3">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-medium">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-medium">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-medium">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      <div className="flex justify-between items-center">
                        {errors.message ? (
                          <p className="text-sm text-red-600">{errors.message}</p>
                        ) : (
                          <p className="text-xs text-gray-500">Minimum 10 characters</p>
                        )}
                        <span className={`text-xs ${formData.message.length < 10 ? 'text-gray-500' : 'text-green-600'}`}>
                          {formData.message.length}/10
                        </span>
                      </div>
                    </div>
                    {submitSuccess && (
                      <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                        <p className="font-medium">✅ Message sent successfully!</p>
                        <p className="text-sm mt-1">Thank you for contacting us. We'll get back to you soon.</p>
                      </div>
                    )}
                    <div className="d-flex gap-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 transition-colors"
                        data-testid="button-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                      <Button 
                        type="reset" 
                        variant="outline" 
                        disabled={isSubmitting}
                        onClick={() => {
                          setFormData({ name: "", email: "", subject: "", message: "" });
                          setErrors({});
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container ">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="">Public Informaton Officer</CardTitle>
          </CardHeader>
          <div className="row">
            <div className="col-md-6">
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <User className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Name</h3>
                        <p className="small text-muted">
                          Dr. Jibran Jamshed [General Manager Legal]
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Phone className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Contact</h3>
                        <p className="small text-muted">
                          +92 (042) 111-PAFDA<br />
                          +92 (042) 99232100
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Mail className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Email</h3>
                        <p className="small text-muted">
                          info@pafda.gop.pk<br />
                          contact@pafda.gop.pk
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <div className="h-12 w-12 rounded bg-primary/10 bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0">
                        <Clock className="text-primary" style={{ width: '24px', height: '24px' }} />
                      </div>
                      <div>
                        <h3 className="fw-semibold mb-2">Working Hours</h3>
                        <p className="small text-muted">
                          Monday - Friday<br />
                          9:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
