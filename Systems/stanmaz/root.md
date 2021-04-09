BBOalert,<br><br>System version<br><br><b>5G 2021 02 05</b><br><br>


CC,summary,\
Transfer_opening_system_(any_force)___\n\
1!C=4+!H_______________1!D=4+!S_______\n\
1!H=5+!C_or_balanced____1!S=5+!D______\n\
First_reponse_in_simple_Texas_________\n\
Then_natural_development______________\n\
______________________________________\n\
Lead_:_3rd/5th_best___________________\n\
_______Top_of_sequence_against_NT_____\n\
_______Inverted_against_suit__________\n\
On_partner's_lead_:_small=encouraging \n\
Italian_discard_:_odd_=_encouraging___\n\
______________even_=_Lavinthal

CC,ntopen,\
1NT=12-15p_no_4M___2NT=20-22p_no_4M

CC,majoropen,\
Openings_from_11p_(unlimited)__________\n\
1!H=5+!C_no_4M_or_16-19p_bal._no_4M____\n\
1!S=5+!D_no_4M_anbalanced_hand

CC,minoropen,\
Openings_from_11p_(unlimited)__________\n\
1!C=4+!H_any_hand______________________\n\
1!D=4+!S_any_hand;_denies_4+!H_if_11-19p

CC,level2open,\
2!C=major_two-suiter___________________\n\
____at_least_5-4_if_weak_(8-11p)_______\n\
____at_least_4-4_if_strong_(20+p)______\n\
2!D=5+!H_weak_(8-11)_or_strong_(20+p)__\n\
2!H=5+!S_weak_(8-11)_or_strong_(20+p)__\n\
2!S=6+!C_or_5+!C5+!D_if_weak(8-11)_____\n\
___6+!C_if_strong_(20+p)

CC,other,\
3!C=6+!D_weak_or_game_forcing_________\n\
3!D=6+!H_weak_or_game_forcing_________\n\
3!H=6+!S_weak_or_game_forcing_________\n\
3!S=AKQxxxx_in_undefined_suit_________\n\
3NT=preempt_on_undefined_minor________\n\
4C=AKQxxxxx_!H_or_AKQxxxx_and_side_Ace\n\
4D=AKQxxxxx_!S_or_AKQxxxx_and_side_Ace

CC,doubles,\
on_1!C/!D_:_may_be_light_with_2_majors

CC,ntocalls,\
Raptor_style_:_4M_and_5+!m

CC,socalls,\
may_be_4_card_at_level_1

CC,over1nt,\
Dbl=5+!H______________________________\n\
2!C=5+!S______________________________\n\
2!D=6!H_and_4!S_______________________\n\
2!H=4!H_and_a_minor___________________\n\
2!S=4!S_and_a_minor___________________\n\
2NT=both_minors


CC,jocalls,\
Preempt__(constructive_if_partner_____\n\
_________not_passed)

CC,overtox,\


CC,directq,\
1!C-2!C=5+!D__________________________\n\
1!D-2!D=5!H_and_5!S___________________\n\
1M-2M=sound_hand_with_a_minor

CC,slam,\
4NT=even_number_of_keycards__(3NT_if__\n\
_______________________fit_in_a_major)\n\
cue=control_+_odd_number_of_keycards

CC,carding,\
Lead_:_3rd/5th_best___________________\n\
_______Top_of_sequence_against_NT_____\n\
_______Inverted_against_suit__________\n\
On_partnr's_lead_:_small_=_encouraging\n\
Italian_discard_:_odd_=_encouraging___\n\
__________________even_=_Lavinthal



End of Convention card

Script,onNewCallSelected,console.log('onNewCallSelected ' + lastSelectedCall + ' *');

Import,https://www.dropbox.com/s/vfc504mnycujie8/wholeSystem.md?dl=0
