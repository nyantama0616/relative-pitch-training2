import { SxProps } from '@mui/system';
import PageTemplate from '../../general/components/PageTemplate';
import { Link } from 'react-router-dom';
import { ListItemButton, List } from '@mui/material';
import { useAuth } from '../auth/contexts/AuthContext';

interface TodoList5Props {
    sx?: SxProps;
}

function TodoListPage5({ sx }: TodoList5Props) {
  const auth = useAuth();

  const trainPath = auth.currentUser?.isShimamura ? "/train/shimamura" : "/train/main";

  return (
    <PageTemplate sx={sx}>
      <h1>やることリスト(5日目)</h1>
      <List>
        <Item index={1} title="ユーザを選択する" to="/users"/>
        <Item index={6} title="トレーニングを行う(システム群の方はこちらをクリック)" to={trainPath} />
        <Item index={7} title="「モチベーションを問うためのアンケート」に答える" to="/questionnaire/motivation" />
        <Item index={3} title="「音楽への興味を問うためのアンケート」に答える" to="/questionnaire/interest" />
        <Item index={4} title="「自己効力感を問うためのアンケート」に答える" to="/questionnaire/self_efficacy" />
        <Item index={8} title="トレーニング後のテストを行う" to="/train/test" />
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

export default TodoListPage5;
