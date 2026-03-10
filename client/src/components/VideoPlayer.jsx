import React from "react";

const isYouTube = (url) =>
  url.includes("youtube.com") || url.includes("youtu.be");

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video glass-card flex items-center justify-center text-textSecondary text-xs">
        Select a lesson to start learning.
      </div>
    );
  }

  if (isYouTube(videoUrl)) {
    let embedUrl = videoUrl;
    if (videoUrl.includes("watch?v=")) {
      const id = new URL(videoUrl).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (videoUrl.includes("youtu.be/")) {
      const id = videoUrl.split("youtu.be/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    return (
      <div className="w-full aspect-video glass-card overflow-hidden">
        <iframe
          src={embedUrl}
          title="Course video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video glass-card overflow-hidden">
      <video src={videoUrl} controls className="w-full h-full object-cover" />
    </div>
  );
};

export default VideoPlayer;

