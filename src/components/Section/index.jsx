import React from 'react';
import { connect } from 'react-redux';
import { classes, periodToString } from '../../utils';
import { CLOSE, OPEN } from '../../constants';
import { SemiPureComponent } from '../';
import { actions } from '../../reducers';
import './stylesheet.scss';

class Section extends SemiPureComponent {
  render() {
    const { className, section, overlay, preview } = this.props;
    const { mobile } = this.props.env;

    return (
      <div className={classes('Section', mobile && 'mobile', overlay && 'overlay', className)}>
        {
          section.meetings.map((meeting, i) => meeting.period && (
            meeting.days.map(day => (
              <div className={`meeting ${day}`} key={[i, day].join('-')}
                   style={{
                     top: (meeting.period.start - OPEN) / (CLOSE - OPEN) * 100 + '%',
                     height: (meeting.period.end - meeting.period.start) / (CLOSE - OPEN) * 100 + '%',
                     backgroundColor: meeting.course.color,
                   }}>
                {
                  !preview &&
                  <div className="meeting-wrapper">
                    <span className="course_id">{meeting.course.id}{mobile ? '' : ` ${meeting.section.id}`}</span>
                    <span className="period">{periodToString(meeting.period)}</span>
                    {
                      !mobile &&
                      <span className="where">{meeting.where}</span>
                    }
                    {
                      !mobile &&
                      <span className="instructors">{meeting.instructors.join(', ')}</span>
                    }
                  </div>
                }
              </div>
            ))
          ))
        }
      </div>
    );
  }
}


export default connect(({ env }) => ({ env }), actions)(Section);
