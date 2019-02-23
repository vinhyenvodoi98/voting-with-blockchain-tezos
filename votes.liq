[%%version 0.4]

type storage = {
  candidates : (string, int) map;
  voters: (address, bool) map;
}

let%init init_candidates (candidate_names : string list) =
  let candidates = List.fold(fun(elt, map)-> Map.add elt 0 map) candidate_names 
      (Map[] : (string, int) map) in
  { candidates: (string, int) map; voters =(Map : (address, bool) map)}
  
let%entry main
    (parameter : string)
    (storage : storage ) =
  
  let addr = Current.source () in
  let storage = 
    storage.voters <- match Map.find addr storage.voters with
      | None -> Map.add addr true storage.voters
      | Some x -> failwith ("Voter has already voted", addr)
  in
  
  let storage =
    storage.candidates <- match Map.find parameter storage.candidates with
      | None -> failwith ("candidate is not valid", parameter)
      | Some x -> Map.add parameter (x + 1) storage.candidates
  in
  
  (([] : operation list), storage)
