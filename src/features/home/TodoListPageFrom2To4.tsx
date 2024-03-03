import { SxProps } from '@mui/system';
import PageTemplate from '../../general/components/PageTemplate';
import { Link } from 'react-router-dom';
import { ListItemButton, List } from '@mui/material';
import { useAuth } from '../auth/contexts/AuthContext';

interface TodoListFrom2To4Props {
    sx?: SxProps;
}

function TodoListPageFrom2To4({ sx }: TodoListFrom2To4Props) {
  const auth = useAuth();

  const trainPath = auth.currentUser?.isShimamura ? "/train/shimamura" : "/train/main";

  return (
    <PageTemplate sx={sx}>
      <h1>やることリスト(2~4日目)</h1>
      <List>
        <Item index={1} title="ユーザを選択する" to="/users"/>
        <Item index={2} title="トレーニングを行う" to={trainPath} />
        <Item index={3} title="「モチベーションを問うためのアンケート」に答える" to="/questionnaire/motivation" />
        <Item index={4} title="トレーニング後のテストを行う" to="/train/test" />
      </List>
    </PageTemplate>
  )
}

interface ItemProps {
  index: number;
  title: string;
  to: string;
}

function Item({ index, title, to }: ItemProps) {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        {`${index}. ${title}`}
      </ListItemButton>
    </Link>
  )
}

export default TodoListPageFrom2To4;
