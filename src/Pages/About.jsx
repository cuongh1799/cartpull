import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "cuongh1799";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(data => setProfile(data));

    // Fetch repos
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=3`)
      .then(res => res.json())
      .then(setRepos);

    // Fetch profile README (from username/username repo)
    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_USERNAME}/readme`)
      .then(res => res.json())
      .then(readmeData => {
        if (readmeData.content) {
          setReadme(atob(readmeData.content.replace(/\n/g, "")));
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5 text-white">
      <h1>About Me</h1>
      {profile && (
        <div className="mb-4">
          <img
            src={profile.avatar_url}
            alt="avatar"
            style={{ width: 100, borderRadius: "50%" }}
          />
          <h2 className="mt-2">{profile.name || profile.login}</h2>
          <p>{profile.bio}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="text-info">
            @{profile.login}
          </a>
        </div>
      )}

      <h3>Recent Repositories</h3>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-info">
              {repo.name}
            </a>
            {repo.description && <span className="text-muted"> — {repo.description}</span>}
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Profile README</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre style={{ background: "#222", padding: 16, borderRadius: 8, overflowX: "auto" }}>
          {readme}
        </pre>
      )}
    </div>
  );
}