export default function objforca5(state=[],action)
{
    let teste;
    if(action.type=='GlobalReset')
    {
        let teste={forca:{ posx: -1, posy: -1, forca: 0}};
    }
    switch(action.type)
    {
    case 'att_Forca5':
        return [action.state];
        case 'GlobalReset':
        
            return[teste];
    default:
        return [...state];
    }
}