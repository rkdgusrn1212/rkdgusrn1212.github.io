const PostListItem = ({fm})=>{
    return (
        <tr>
            <th>{fm.title}</th>
            <td>{fm.categories}</td>
            <td>{fm.date}</td>
        </tr>
    );
}
export default PostListItem;