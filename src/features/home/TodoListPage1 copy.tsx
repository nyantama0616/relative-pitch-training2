import { SxProps } from '@mui/system';
import PageTemplate from '../../general/components/PageTemplate';
import { Link } from 'react-router-dom';
import { ListItemButton, List } from '@mui/material';

interface TodoList1Props {
    sx?: SxProps;
}

function TodoListPage1({ sx }: TodoList1Props) {
  return (
    <PageTemplate sx={sx}>
      <h1>やることリスト(1日目)</h1>
      <List>
        <Item index={1} title="ユーザを選択する" to="/users"/>
        <Item index={2} title="「属性を問うためのアンケート」に答える" to="/questionnaire/attribute" />
        <Item index={3} title="「音楽への興味を問うためのアンケート」に答える" to="/questionnaire/interest" />
        <Item index={4} title="「自己効力感を問うためのアンケート」に答える" to="/questionnaire/self_efficacy" />
        <Item index={5} title="トレーニング前のテストを行う" to="/train/test" />
        <Item index={6} title="トレーニングを行う(システム群の方はこちらをクリック)" to="/train/main" />
        <Item index={7} title="「モチベーションを問うためのアンケート」に答える" to="/questionnaire/motivation" />
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

export default TodoListPage1;
