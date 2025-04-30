import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Chip, CircularProgress, Avatar, Link, Divider, Tab, Tabs, Pagination, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import SEO from './SEO';
import './Skills.css';

// Define types
interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool';
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  description: string;
  imageUrl: string;
  credlyUrl?: string;
  courseraUrl?: string;
}

// Card components
const CertificationCard = ({ certification: cert }: { certification: Certification }) => (
  <Card 
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: 6
      }
    }}
    className="certification-card"
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Avatar 
        src={cert.imageUrl} 
        alt={cert.title} 
        sx={{ 
          width: 120, 
          height: 120,
          mb: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
        className="certification-logo"
      />
      <Typography variant="h6" align="center" gutterBottom>
        {cert.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {cert.issuer}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
        Issued: {new Date(cert.issueDate).toLocaleDateString()}
      </Typography>
      {cert.expirationDate && (
        <Typography variant="body2" color="textSecondary" align="center">
          Expires: {new Date(cert.expirationDate).toLocaleDateString()}
        </Typography>
      )}
      <Divider sx={{ width: '100%', my: 2 }} />
      <Typography variant="body2" align="center" sx={{ flexGrow: 1 }}>
        {cert.description}
      </Typography>
      
      {(cert.credlyUrl || cert.courseraUrl) && (
        <Link 
          href={cert.credlyUrl || cert.courseraUrl} 
          target="_blank" 
          rel="noopener" 
          className="credential-link"
          sx={{ 
            mt: 2, 
            display: 'inline-flex', 
            alignItems: 'center',
            '&:hover': {
              textDecoration: 'none',
            }
          }}
        >
          {cert.credlyUrl ? "View Credential" : "View Certificate"}
        </Link>
      )}
    </Box>
  </Card>
);

const SkillChip = ({ name }: { name: string }) => (
  <Chip 
    label={name} 
    variant="outlined"
    sx={{
      m: 0.5,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'primary.main',
        color: 'white',
        transform: 'translateY(-3px)',
        boxShadow: 2
      }
    }}
    className="skill-chip"
  />
);

const Skills = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificationTab, setCertificationTab] = useState(0);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  // Add these state variables for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9); // Display 9 certifications per page (3x3 grid)

  // Add a search field for filtering certifications
  const [searchTerm, setSearchTerm] = useState('');

  // Add these helper functions for pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCertificationTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCertificationTab(newValue);
    setPage(0); // Reset to first page when changing tabs
  };

  // Define the API base URL (adjust as needed for your environment)
  const API_BASE_URL = 'http://localhost:3001'; // or whatever port your API is running on

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        
        try {
          console.log('Fetching skills and certifications...');
          
          // Get skills with full URL
          const skillsResponse = await fetch(`${API_BASE_URL}/api/v1/allskills`);
          
          if (!skillsResponse.ok) {
            throw new Error(`Skills API responded with status: ${skillsResponse.status}`);
          }
          
          const skillsData = await skillsResponse.json();
          console.log(`Received ${skillsData.length} skills from allskills endpoint`);
          
          // Get certifications with full URL
          const certificationsResponse = await fetch(`${API_BASE_URL}/api/v1/all-certifications`);
          
          if (!certificationsResponse.ok) {
            throw new Error(`Certifications API responded with status: ${certificationsResponse.status}`);
          }
          
          const certData = await certificationsResponse.json();
          console.log(`Received ${certData.length} certifications from all-certifications endpoint`);
          console.log('Sample of first 3 certifications:', certData.slice(0, 3));
          
          // Check if we have valid data
          if (!skillsData || !certData || skillsData.length === 0 || certData.length === 0) {
            console.error('API returned empty data');
            setError('Failed to load data from API: Empty response');
            setLoading(false);
            return;
          }
          
          // Set the data
          setSkills(skillsData);
          setCertifications(certData);
          
          // Log distribution
          const credlyCount = certData.filter((c: Certification) => c.credlyUrl && c.credlyUrl.trim() !== '').length;
          const courseraCount = certData.filter((c: Certification) => c.courseraUrl && c.courseraUrl.trim() !== '').length;
          const otherCount = certData.filter((c: Certification) => 
            (!c.credlyUrl || c.credlyUrl.trim() === '') && 
            (!c.courseraUrl || c.courseraUrl.trim() === '')
          ).length;
          
          console.log(`Frontend certification counts: Credly: ${credlyCount}, Coursera: ${courseraCount}, Other: ${otherCount}`);
          
          setLoading(false);
          setDataSource('api');
          
        } catch (err: any) {
          console.error('Error fetching data from API:', err);
          
          // Set a more descriptive error
          if (err.name === 'AbortError') {
            setError('Request timed out');
          } else if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
            setError('Network error: Could not connect to API server');
          } else {
            setError(`Failed to load data: ${err.message}`);
          }
          setLoading(false);
        }
        
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Unexpected error occurred');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (certifications.length > 0) {
      console.log(`Processing ${certifications.length} certifications in useEffect`);
      
      // Filter certifications by type
      const withCredly = certifications.filter((cert: Certification) => 
        cert.credlyUrl && typeof cert.credlyUrl === 'string' && cert.credlyUrl.trim() !== ''
      );
      
      const withCoursera = certifications.filter((cert: Certification) => 
        cert.courseraUrl && typeof cert.courseraUrl === 'string' && cert.courseraUrl.trim() !== ''
      );
      
      const other = certifications.filter((cert: Certification) => 
        (!cert.credlyUrl || typeof cert.credlyUrl !== 'string' || cert.credlyUrl.trim() === '') &&
        (!cert.courseraUrl || typeof cert.courseraUrl !== 'string' || cert.courseraUrl.trim() === '')
      );
      
      console.log(`Filtered certifications - Credly: ${withCredly.length}, Coursera: ${withCoursera.length}, Other: ${other.length}`);
    }
  }, [certifications]);

  // Group skills by category
  const technicalSkills = skills.filter(skill => skill.category && skill.category.toLowerCase() === 'technical');
  const toolSkills = skills.filter(skill => skill.category && skill.category.toLowerCase() === 'tool');
  const softSkills = skills.filter(skill => skill.category && skill.category.toLowerCase() === 'soft');
  const languageSkills = skills.filter(skill => skill.category && skill.category.toLowerCase() === 'language');

  // Update these filtering functions to handle null, undefined, and empty strings
  const cloudCerts = certifications.filter(cert => 
    cert.credlyUrl && typeof cert.credlyUrl === 'string' && cert.credlyUrl.trim() !== ''
  );

  const courseraOnlineCerts = certifications.filter(cert => 
    cert.courseraUrl && typeof cert.courseraUrl === 'string' && cert.courseraUrl.trim() !== ''
  );

  const otherCerts = certifications.filter(cert => 
    (!cert.credlyUrl || typeof cert.credlyUrl !== 'string' || cert.credlyUrl.trim() === '') &&
    (!cert.courseraUrl || typeof cert.courseraUrl !== 'string' || cert.courseraUrl.trim() === '')
  );

  // Add search filtering
  const filterCertifications = (certs: Certification[]) => {
    if (!searchTerm) return certs;
    
    return certs.filter(cert => 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.description && cert.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredCloudCerts = filterCertifications(cloudCerts);
  const filteredCourseraCerts = filterCertifications(courseraOnlineCerts);
  const filteredOtherCerts = filterCertifications(otherCerts);

  // Pagination function
  const paginateCerts = (certs: Certification[]) => {
    return certs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  // Debug logs for certifications
  console.log('All certifications:', certifications);
  console.log('Cloud certs (with credlyUrl):', cloudCerts);
  console.log('Online certs (with courseraUrl):', courseraOnlineCerts);

  // Check for certifications that don't appear in either category
  const missingCerts = certifications.filter(cert => 
    (!cert.credlyUrl || cert.credlyUrl.length === 0) && 
    (!cert.courseraUrl || cert.courseraUrl.length === 0)
  );
  console.log('Certifications not in any tab:', missingCerts);

  // Debug logs
  console.log('Skills loaded:', skills.length);
  console.log('Certifications loaded:', certifications.length);
  console.log(`Filtered certifications - Cloud: ${filteredCloudCerts.length}, Coursera: ${filteredCourseraCerts.length}, Other: ${filteredOtherCerts.length}`);

  // Add these logs before your component returns
  console.log('All skills:', skills);
  console.log('Technical skills:', technicalSkills);
  console.log('Tool skills:', toolSkills);
  console.log('Soft skills:', softSkills);
  console.log('Language skills:', languageSkills);
  console.log('All certifications:', certifications);
  console.log('Cloud certs:', cloudCerts);
  console.log('Online certs:', courseraOnlineCerts);

  return (
    <Container>
      <SEO 
        title="Skills & Certifications" 
        description="View my technical skills, tools, languages, and professional certifications."
      />
      
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mt: 4 }}>
        Skills & Certifications
      </Typography>

      {/* Add info about data source */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Data source: {dataSource === 'api' ? 'API' : 'Demo data'} 
          ({skills.length} skills, {certifications.length} certifications)
        </Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error ? (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography variant="h6" color="error" gutterBottom>
                {error}
              </Typography>
              <Typography variant="body1" paragraph>
                Unable to load skills and certifications from the API.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.location.reload()}
                startIcon={<ReplayIcon />}
              >
                Retry
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
                Skills
              </Typography>
              
              {/* Technical Skills Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Technical Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {technicalSkills.map(skill => (
                    <SkillChip key={skill.id} name={skill.name} />
                  ))}
                </Box>
              </Box>
              
              {/* Tools Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Tools & Platforms
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {toolSkills.map(skill => (
                    <SkillChip key={skill.id} name={skill.name} />
                  ))}
                </Box>
              </Box>
              
              {/* Soft Skills Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Soft Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {softSkills.map(skill => (
                    <SkillChip key={skill.id} name={skill.name} />
                  ))}
                </Box>
              </Box>
              
              {/* Languages Section */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Languages
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {languageSkills.map(skill => (
                    <SkillChip key={skill.id} name={skill.name} />
                  ))}
                </Box>
              </Box>
              
              {/* Certifications Section */}
              <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
                Certifications
              </Typography>

              {/* Add this search field below the Certifications heading */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <TextField
                  label="Search Certifications"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: { xs: '100%', sm: '50%' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <Tabs 
                value={certificationTab} 
                onChange={handleCertificationTabChange}
                centered
                sx={{ mb: 4 }}
              >
                <Tab label={`Cloud Credentials (${cloudCerts.length})`} />
                <Tab label={`Online Courses (${courseraOnlineCerts.length})`} />
                {otherCerts.length > 0 && <Tab label={`Other Certifications (${otherCerts.length})`} />}
              </Tabs>
              
              {/* For the first tab (Cloud Credentials) */}
              {certificationTab === 0 && (
                <>
                  {filteredCloudCerts.length > 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
                      {paginateCerts(filteredCloudCerts).map(cert => (
                        <CertificationCard key={cert.id} certification={cert} />
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', my: 4 }}>
                      <Typography variant="body1">
                        No cloud credentials found. Either they don't exist in the database or they don't have a credlyUrl.
                      </Typography>
                    </Box>
                  )}
                  {filteredCloudCerts.length > rowsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Pagination 
                        count={Math.ceil(filteredCloudCerts.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(e, p) => setPage(p - 1)}
                        color="primary"
                      />
                    </Box>
                  )}
                </>
              )}

              {/* For the second tab (Online Courses) */}
              {certificationTab === 1 && (
                <>
                  {filteredCourseraCerts.length > 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
                      {paginateCerts(filteredCourseraCerts).map(cert => (
                        <CertificationCard key={cert.id} certification={cert} />
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', my: 4 }}>
                      <Typography variant="body1">
                        No online courses found. Either they don't exist in the database or they don't have a courseraUrl.
                      </Typography>
                    </Box>
                  )}
                  {filteredCourseraCerts.length > rowsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Pagination 
                        count={Math.ceil(filteredCourseraCerts.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(e, p) => setPage(p - 1)}
                        color="primary"
                      />
                    </Box>
                  )}
                </>
              )}

              {/* For the third tab (Other Certifications) */}
              {certificationTab === 2 && (
                <>
                  {filteredOtherCerts.length > 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
                      {paginateCerts(filteredOtherCerts).map(cert => (
                        <CertificationCard key={cert.id} certification={cert} />
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', my: 4 }}>
                      <Typography variant="body1">
                        No other certifications found. This category includes certifications without credlyUrl or courseraUrl.
                      </Typography>
                    </Box>
                  )}
                  {filteredOtherCerts.length > rowsPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Pagination 
                        count={Math.ceil(filteredOtherCerts.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(e, p) => setPage(p - 1)}
                        color="primary"
                      />
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Skills;