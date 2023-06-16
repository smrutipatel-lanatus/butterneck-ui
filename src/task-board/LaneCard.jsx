import { AccessTime as AccessTimeIcon, Mode as ModeIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Avatar, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import useMutationApi from '../hooks/useMutationApi';
import { UpdateCardFormPopUp } from './UpdateCardForm';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';

const getFirstLetterCapital = (str) => {
  return str && str[0]?.toUpperCase();
};

export const LaneCard = (props) => {
  const theme = useTheme();
  const styles = {
    cardBox: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardDescription: {
      marginY: '10px',
      fontSize: '15px',
      color: theme.palette.primary.subtitle1,
      display: '-webkit-box',
      WebkitLineClamp: '4',
      height: '95px',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    cardInfo: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    assigneeAvatar: { backgroundColor: theme.palette.primary.link, fontSize: '14px', width: '30px', height: '30px' },
    cardStyle: { backgroundColor: theme.palette.primary.contrastText, padding: 1, borderRadius: 2 },
  };

  const { onClick, showDeleteButton, showUpdateButton = true, onDelete } = props;

  //! hooks
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: props.title,
    dueDate: props.dueDate,
    priority: props.priority,
    description: props.description,
    assignedTo: props.assignedTo,
    id: props.id,
  });
  useEffect(() => {
    setData({
      title: props.title,
      dueDate: props.dueDate,
      priority: props.priority,
      description: props.description,
      assignedTo: props.assignedTo,
      id: props.id,
    });
  }, [props]);

  //! apis
  const { mutateAsync: deleteTask } = useMutationApi({
    method: 'delete',
    endpoint: `/task/${props.id}`,
  });

  //! functions
  const handleDelete = async (e) => {
    onDelete();
    await deleteTask();
    e.stopPropagation();
  };

  const renderPriorityIcon = (priorityText) =>
    priorityText && (
      <>
        <PriorityHighIcon
          sx={{
            background:
              priorityText === 'High'
                ? theme.palette.error.main
                : priorityText === 'Medium'
                ? theme.palette.warning.light
                : priorityText === 'Low'
                ? theme.palette.success.main
                : theme.palette.success.main,
            height: '20px',
            width: '20px',
            mt: 0.8,
            mr: 0.5,
            borderRadius: '100%',
          }}
        />
      </>
    );

  const handleUpdate = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <Box onClick={onClick} sx={{ py: 1, width: '300px' }}>
      <Box sx={styles.cardStyle}>
        <Box sx={styles.cardBox}>
          <Typography title={data.title} variant="body1" fontWeight={'bold'} component="p" sx={styles.cardTitle}>
            {data.title}
          </Typography>
          <Box>
            {showUpdateButton && <ModeIcon sx={{ mx: 1 }} fontSize="small" onClick={handleUpdate} />}
            {showDeleteButton && <DeleteIcon fontSize="small" onClick={handleDelete} />}
          </Box>
        </Box>

        <Typography sx={styles.cardDescription}>{data.description}</Typography>
        <Box sx={styles.cardInfo}>
          {data.dueDate && data.dueDate !== '' ? (
            <Typography
              sx={{
                background: '#091e420d',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '120px',
                color: data.dueDate <= dayjs().format('YYYY-MM-DD') ? 'error.main' : 'primary.subtitle1',
              }}
            >
              <AccessTimeIcon fontSize="12px" sx={{ marginRight: '5px' }} />
              {dayjs(data.dueDate).format('YYYY-MM-DD')}
            </Typography>
          ) : (
            <Typography
              sx={{
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '120px',
                color: data.dueDate <= dayjs().format('YYYY-MM-DD') ? 'error.main' : 'primary.subtitle1',
              }}
            ></Typography>
          )}
          <Box display="flex">
            <Box>{renderPriorityIcon(data.priority)}</Box>
            {data.assignedTo && (
              <Avatar sx={styles.assigneeAvatar} title={'assignee'}>
                {getFirstLetterCapital(data.assignedTo)}
              </Avatar>
            )}
          </Box>
        </Box>
      </Box>
      <UpdateCardFormPopUp open={open} setOpen={setOpen} {...props} data={data} setData={setData} />
    </Box>
  );
};
