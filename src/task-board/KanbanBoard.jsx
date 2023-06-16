import React, { useCallback, useEffect, useRef, useState } from 'react';
import Board from 'react-trello';
import useMutationApi from '../hooks/useMutationApi';
import { LaneCard } from './LaneCard';
import { useParams } from 'react-router-dom';
import { NewCardForm } from './NewCardForm';
import { LaneHeader } from './LaneHeader';
import AddCardLink from './AddCardLink';
import { NewLaneForm } from './NewStageForm';
import { updateValue, updateValueWithTwoCondition } from '../utils/objectUtils';
import { NewLaneSection } from './NewLaneSection';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const makeBoardData = (boardData) => {
  const laneData = boardData
    .map((lane) => {
      const { id, name, Task, position } = lane;
      const cards = Task?.length
        ? Task.map((taskInfo) => {
            const { id, title, description, priority, dueDate, position, assignedTo } = taskInfo;
            return {
              id: id,
              title,
              description,
              priority,
              dueDate,
              position,
              assigneeId: assignedTo?.id,
              assignedTo: assignedTo?.name,
            };
          }).sort((a, b) => a.position - b.position)
        : [];
      return {
        id: id,
        title: name,
        label: Task?.length.toString(),
        cards,
        position,
      };
    })
    .sort((a, b) => a.position - b.position);

  const resData = { lanes: laneData };
  return resData;
};

export const KanbanBoard = () => {
  const theme = useTheme();
  console.log({
    theme,
  });
  const components = { Card: LaneCard, AddCardLink, NewCardForm, NewLaneForm, NewLaneSection, LaneHeader };
  const [boardData, setBoardData] = useState();
  const updatedLane = useRef([]);
  const updatedDataOfBoard = useRef();
  const [updatedStage, setUpdatedStage] = useState(0);
  const { id: projectId } = useParams();

  //! apis
  const { mutateAsync: getTaskData } = useMutationApi({
    method: 'get',
    endpoint: `/task-stage/project/${projectId}`,
  });
  const { mutateAsync: updateMultipleTask } = useMutationApi({
    method: 'put',
    endpoint: '/task/multiple',
  });
  const { mutateAsync: addTask } = useMutationApi({
    method: 'post',
    endpoint: `/task`,
  });
  const { mutateAsync: addTaskStage } = useMutationApi({
    method: 'post',
    endpoint: `/task-stage`,
  });
  const { mutateAsync: updateTaskStage } = useMutationApi({
    method: 'patch',
    endpoint: `/task-stage/${updatedStage}`,
  });

  //! functions
  const fetchTask = useCallback(async () => {
    const res = await getTaskData();
    if (res.status === 200) {
      const resData = makeBoardData(res.data.data);
      setBoardData(resData);
    } else {
      alert('something went wrong');
    }
  }, [getTaskData]);

  const changeTaskStagePosition = async (removedIndex, addedIndex, payload) => {
    const stageId = payload.id;
    const position = addedIndex + 1;
    setUpdatedStage(stageId);
    await updateTaskStage({
      position,
    });
  };

  const updateTask = async (updatedLane, data) => {
    if (data && updatedLane.length > 0) {
      const updateTaskData = [];
      data.lanes.forEach((data) => {
        if (updatedLane.includes(data.id)) {
          data.cards.forEach((info, index) => {
            updateTaskData.push({
              id: info.id,
              taskStageId: info.laneId,
              position: index,
            });
          });
        }
      });
      await updateMultipleTask({ tasks: updateTaskData });
    }
  };

  const handleCardDragEnd = async (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    if (sourceLaneId === targetLaneId) {
      updatedLane.current = [sourceLaneId];
    } else {
      updatedLane.current = [sourceLaneId, targetLaneId];
    }
  };

  const handleAddCard = async (e) => {
    const data = { ...e };
    const id = data.id;
    data.projectId = Number(projectId);
    data.position = boardData?.lanes?.find(({ id }) => id === data.taskStageId)?.cards.length;
    delete data.id;
    const res = await addTask(data);
    const newValue = res?.data?.data?.assignedTo?.name;

    await updateValue(updatedDataOfBoard.current, res.data.data.id, id);
    if (newValue) {
      await updateValueWithTwoCondition(
        updatedDataOfBoard.current,
        'id',
        'laneId',
        res.data.data.id,
        res.data.data.taskStageId,
        'assignedTo',
        newValue
      );
    }
  };

  const handleLaneAdd = async (e) => {
    const data = {
      name: e,
      projectId: Number(projectId),
      position: updatedDataOfBoard?.current?.lanes?.length + 1,
    };
    addTaskStage(data).then((res) => {
      fetchTask();
    });
  };

  //! hooks
  useEffect(() => {
    if (projectId) {
      fetchTask();
    }
  }, [fetchTask, projectId]);

  return (
    <>
      {boardData ? (
        <Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'center',
              mt: '1rem',
            }}
          >
            Project Title
          </Typography>
          <Board
            editable
            draggable
            canAddLanes
            data={boardData}
            components={components}
            onDataChange={(data) => {
              updatedDataOfBoard.current = data;
              updateTask(updatedLane.current, data);
            }}
            handleLaneDragStart={(a) => {
              setUpdatedStage(a);
            }}
            handleLaneDragEnd={changeTaskStagePosition}
            handleDragEnd={handleCardDragEnd}
            onLaneAdd={handleLaneAdd}
            onCardAdd={handleAddCard}
            laneStyle={{ padding: '1rem', borderRadius: '0.5rem' }}
            style={{ backgroundColor: theme.palette.primary.contrastText }}
          />
        </Box>
      ) : null}
    </>
  );
};
