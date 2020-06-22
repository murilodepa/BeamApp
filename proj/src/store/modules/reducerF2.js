export default function objforca2(state=[],action)
{   let teste;
    if(action.type=='GlobalReset')
    {
        let teste={forca:{ posx: -1, posy: -1, forca: 0}};
    }

    switch(action.type)
    {
    case 'att_Forca2':
        return [action.state];
        case 'GlobalReset':
        
            return[teste];
    default:
        return [...state];
    }
}