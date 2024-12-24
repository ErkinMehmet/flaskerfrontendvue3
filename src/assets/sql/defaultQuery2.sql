select 
       COALESCE(a2.c, 0) as articlecount,
       COALESCE(j2.c, 0) as jobcount,ot.title
from organization o
inner join organization_type ot
    on ot.id = o.organizationtypeid
inner join subscription s
    on o.subscriptionid = s.id
inner join payment_type pt
    on pt.id = s.paymenttypeid
left join (
    select organizationid, 
        sum(amount) as paysum, 
        count(amount) as paycount 
    from payment p
    group by organizationid
) p2
    on p2.organizationid = o.id
left join (
    select organizationid, 
        count(id) as c 
    from article a
    group by organizationid
) a2
    on a2.organizationid = o.id
left join (
    select organizationid, 
        count(id) as c 
    from job j
    group by organizationid
) j2
    on j2.organizationid = o.id
left join (
    select organizationid, 
        count(id) as c 
    from course c
    group by organizationid
) c2
    on c2.organizationid = o.id
left join (
    select organizationid, 
        count(id) as c 
    from planned_event e
    group by organizationid
) e2
    on e2.organizationid = o.id
