export default function objsuporteA2(state=[],action)
{
    let teste;
    if(action.type=='GlobalReset')
    {
        let teste={forca:{ posx: -1, posy: -1}};
    }
    switch(action.type)
    {
        case 'GlobalReset':
        
            return[teste];
    case 'att_suporteA2':
        return [action.state];
    default:
        return [...state];
    }

}