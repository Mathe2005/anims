export const animationList = [
    {
        id:0,
        name:'Действия',
        img:'actions',
        special:false,
        animations:
        [
            {
                id: 0,
                name: 'Почесать задницу',
                ad: 'anim@heists@team_respawn@respawn_02',
                an: 'heist_spawn_02_ped_d',
                af: 8
            },
            {
                id: 1,
                name: 'Потереть шею',
                ad: 'amb@world_human_cop_idles@female@idle_a',
                an: 'idle_c',
                af: 8
            },
            // ... (include all other animations from your original animList.js)
            {
                id: 31,
                name: 'Закинуться',
                ad: 'move_m@drunk@transitions',
                an: 'slightly_to_idle',
                af: 8
            }
        ]
    },
    // ... (include all other categories - dancing, emotion, gait_style, indecent, physical_exercise, racks, social)
    {
        id:7,
        name:'Стили походки',
        img:'racks',
        special:true,
        animations:
        [
            {
                id: 0,
                name: 'Стандартная',
                style: ''
            },
            // ... (include all walk styles)
            {
                id: 30,
                name: 'Крутая',
                style: 'MOVE_M@TOUGH_GUY@'
            }
        ]
    }
];