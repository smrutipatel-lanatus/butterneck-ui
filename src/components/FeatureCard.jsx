import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

export function FeatureCard({ title, svg: Svg, svgWidth = 120, description, onClick }) {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: { xs: 340, md: 400 }, borderRadius: '10px', textAlign: 'center' }}
      onClick={onClick}
    >
      <CardHeader title={title} titleTypographyProps={{ fontWeight: 'bold', lineHeight: '0.5' }} />
      <Divider sx={{ mb: '0.5rem' }} />
      <Svg width={svgWidth} />

      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}
