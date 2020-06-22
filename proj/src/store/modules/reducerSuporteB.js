export default function objsuporteB(state=[],action)
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
    case 'att_suporteB':
        return [action.state];
    default:
        return [...state];
    }

}