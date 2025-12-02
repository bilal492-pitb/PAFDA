import express from "express";
import handler from "../../server/index.js"; // your real express app

export default function (req, res) {
  return handler(req, res);
}
