import { useParams, Navigate } from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardHeader,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { ArrowDownward, ExpandMore, MoreRounded } from '@mui/icons-material';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';
import { _userList } from '../_mock';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

const sites = [
  { name: 'Facebook', data: { heart_rate: 32, temperature: 34, pressure: 32, hours: 323, days: 32 } },
  { name: 'Twitter', data: { heart_rate: 32, temperature: 34, pressure: 32, hours: 323, days: 32 } },
  { name: 'Instagram', data: { heart_rate: 32, temperature: 34, pressure: 32, hours: 323, days: 32 } },
  { name: 'TikTok', data: { heart_rate: 32, temperature: 34, pressure: 32, hours: 323, days: 32 } },
];

export default function UserPage() {
  const { themeStretch } = useSettings();
  const { id } = useParams();

  const user = _userList.find((user) => user.id === id);

  if (!user) return <Navigate to={`/404`} />;

  return (
    <Page title="User Page">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'User Page'}
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            {
              name: 'Users',
              href: '/dashboard/users',
            },
            { name: user.name },
          ]}
        />
        <Paper variant={'outlined'} sx={{ padding: '1.5rem', backgroundColor: 'rgba(145, 158, 171, 0.04)' }}>
          <Typography variant="h5" mb={2}>
            Most harmful websites
          </Typography>
          <Box padding={'1rem'}>
            {sites.map((site) => (
              <Accordion key={site.name}>
                <AccordionSummary expandIcon={<ExpandMore />}>{site.name}</AccordionSummary>
                <AccordionDetails sx={{ div: { mb: (theme) => theme.spacing(2) }, dt: { fontWeight: 'bold' } }}>
                  <dl>
                    <Box>
                      <dt>Heart Rate</dt>
                      <dd>{site.data.heart_rate}</dd>
                    </Box>
                    <Box>
                      <dt>Body Temperature</dt>
                      <dd>{site.data.temperature}</dd>
                    </Box>
                    <Box>
                      <dt>Blood Pressure</dt>
                      <dd>{site.data.pressure}</dd>
                    </Box>
                    <Box>
                      <dt>Avg daily usage</dt>
                      <dd>{(site.data.hours / site.data.days).toFixed(2)} hr</dd>
                    </Box>
                  </dl>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Container>
    </Page>
  );
}
