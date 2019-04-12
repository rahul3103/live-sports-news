import React, { PureComponent } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import moment from 'moment';

const styles = {
  card: {
    maxWidth: 345 * 2,
    border: '1px solid #3f51b5',
    padding: 10,
    marginBottom: 10
  },
  media: {
    height: 140 * 2
  }
};

class Article extends PureComponent {
  render() {
    const { title, description, publishedAt, source, urlToImage } = this.props;

    const time = moment(publishedAt || moment.now()).fromNow();

    return (
      <Card style={styles.card}>
        <CardActionArea>
          {urlToImage && (
            <CardMedia style={styles.media} image={urlToImage} title={title} />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            {source && source.name}
          </Button>
          <Button size="small" color="primary">
            {time}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Article;
