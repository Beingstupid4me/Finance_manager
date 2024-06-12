import * as React from 'react';
import { useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Container } from '@mui/material';

function Timeliner(proping) {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        if (proping.data.transactions) {
            const sortedTransactions = [...proping.data.transactions].sort((a, b) => b.timestamp - a.timestamp);
            const lastFourTransactions = sortedTransactions.slice(0, 4);
            setData(lastFourTransactions);
        }
    }, [proping.data.transactions]);

  return (
    <Container className=' px-0 mx-0 h-full overflow-y-auto overflow-x-hidden'>
    <Timeline className=' max-w-full max-h-full mx-0'>
      {data.map((transaction) => {
        const date = new Date(transaction.timestamp.seconds * 1000);
        return (<TimelineItem key={transaction.id} className=' max-w-full max-h-full px-0'>
          <TimelineOppositeContent color={transaction.type == "Credit" || transaction.type == "credit" ? "text.primary" : "text.secondary" }>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={transaction.type == "Credit" || transaction.type == "credit" ? "success" : "secondary" }/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className=' break-words'>{transaction.message}</TimelineContent>
        </TimelineItem>
        );
      })}
    </Timeline>
    </Container>
  );
}


export default Timeliner
