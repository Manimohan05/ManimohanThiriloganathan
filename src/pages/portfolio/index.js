import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { allProjects, projectsNav } from "./ProjectsData";
import { meta, skills } from "../../content_option";
import outputvideo from "../../assets/photos/VideoV1.mp4";


export const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const mediumUsername = "manimohan517";
        const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          rssUrl
        )}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "ok") {
          setBlogPosts(data.items);
        } else {
          console.error("Failed to fetch blog posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  const extractImage = (html) => {
    const match = html?.match(/<img.*?src=["'](.*?)["']/);
    return match ? match[1] : null;
  };

  const latestPosts = blogPosts.slice(0, 3); 

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Projects</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* Filter Buttons */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              {projectsNav.map((nav, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === nav.name ? "dark" : "outline-dark"}
                  onClick={() => setSelectedCategory(nav.name)}
                >
                  {nav.name}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

<Row className="mb-4">
  <Col>
    <Card className="h-100 shadow-sm card-light card-blue-text">
      <div className="ratio ratio-16x9">
        <video
          src={outputvideo}
          autoPlay
          loop
          controls
          style={{
            width: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title className="fw-bold">Final Year Project</Card.Title>
        <Card.Text className="text-muted">
          This project demonstrates the automated pick-and-place process using a robotic arm simulation in RoboDK, integrated with trajectory planning verified in MATLAB.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>


        {/* Projects Grid styled like cards */}
        <Row xs={1} md={2} lg={3} className="g-4 mb-5">
          {filteredProjects.map((project, idx) => (
            <Col key={idx}>
              <Card className="h-100 shadow-sm card-light card-blue-text">
                <Card.Img
                  variant="top"
                  src={project.image}
                  alt={project.title}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-truncate">
                    {project.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{project.category}</Card.Text>
                  <Button
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline-primary"
                    className="mt-auto"
                  >
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

         <Row className="sec_sp">
          <Col lg="12">
            <h3 className="color_sec py-4">Skills</h3>
            {skills.map((data, i) => (
              <Row key={i} className="mb-3 align-items-start">
                <Col md="3" className="fw-bold">
                  {data.category}
                </Col>
                <Col md="9">
                  <ul className="list-unstyled d-flex flex-wrap gap-1">
                    {data.items.map((item, index) => (
                      <li
                        key={index}
                        className="badge bg-secondary text-light p-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>

        {/* Blog Posts Section */}
        <Row className="sec_sp">
          <Col lg="12">
            <h3 className="color_sec py-4">My Latest Blogs</h3>
            {latestPosts.length === 0 ? (
              <p>Loading blogs...</p>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-3">
                {latestPosts.map((post, idx) => {
                  const imageUrl =
                    post.thumbnail ||
                    extractImage(post.content || post.description || "");

                  return (
                    <Col key={idx}>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        <Card className="h-100 shadow-sm card-light card-blue-text">
                          {imageUrl && (
                            <Card.Img
                              variant="top"
                              src={imageUrl}
                              alt={post.title}
                              style={{
                                height: "180px",
                                objectFit: "cover",
                                borderTopLeftRadius: "0.5rem",
                                borderTopRightRadius: "0.5rem",
                              }}
                            />
                          )}
                          <Card.Body className="d-flex flex-column">
                            <Card.Title className="fw-bold text-truncate">
                              {post.title}
                            </Card.Title>
                            <Card.Text className="mt-auto mb-1">
                              {new Date(post.pubDate).toLocaleDateString()}
                            </Card.Text>
                            <span className="text-muted">medium.com</span>
                          </Card.Body>
                        </Card>
                      </a>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
