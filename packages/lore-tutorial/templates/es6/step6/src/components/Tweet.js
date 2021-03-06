import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Tweet extends React.Component {

  getStyles() {
    return {
      avatar: {
        width: '32px',
        border: '1px solid gray'
      },
      imageContainer: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '32px'
      },
      contentContainer: {
        display: 'inline-block',
        marginLeft: '8px',
        maxWidth: '85%'
      },
      title: {
        lineHeight: '32px',
        display: 'inline-block'
      },
      text: {
        marginBottom: '5px'
      },
      timestamp: {
        display: 'inline-block',
        marginLeft: '8px',
        color: '#999',
        fontSize: '14px'
      }
    }
  }

  render () {
    const styles = this.getStyles();
    const tweet = this.props.tweet;
    const timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];

    return (
      <li className="list-group-item">
        <div style={styles.imageContainer}>
          <img
            className="img-circle"
            src={'http://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png'}
            style={styles.avatar}/>
        </div>
        <div style={styles.contentContainer}>
          <h4 className="list-group-item-heading" style={styles.title}>
            Nickname
          </h4>
          <h4 className="list-group-item-heading" style={styles.timestamp}>
            {'- ' + timestamp}
          </h4>
          <p className="list-group-item-text" style={styles.text}>
            {tweet.data.text}
          </p>
        </div>
      </li>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
