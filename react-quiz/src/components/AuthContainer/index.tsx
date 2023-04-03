import React from 'react';
//import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Container, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material';
export interface IAuthContainerProps {
    header: any;
    children: any;
}

const AuthContainer: React.FunctionComponent<IAuthContainerProps> = props => {
    const { children, header } = props;

    return (
        <Container maxWidth="lg" sx={{ paddingTop: '100px' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                sx={{ backgroundColor: 'primary.main', color: 'common.black', textAlign: 'center' }}
                title={header}
                titleTypographyProps={{ variant: 'h5' }}
                //textAlign="center"
              />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {children}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
}

export default AuthContainer;