<?php

namespace App\Controllers;
use App\Models\Model;

class SearchController extends Controller
{
    public function genderPref($userGender, $userPref, $gender, $pref){
        if ($userGender == 'female' && $userPref == 'hetero')
        {
            if ($gender == 'male' && $pref != 'homo')
                return true;
            return false;
        }
        if ($userGender == 'female' && $userPref == 'homo')
        {
            if ($gender == 'female' && $pref != 'hetero')
                return true;
            return false;
        }
        if ($userGender == 'female' && $userPref == 'bi')
        {
            if ($pref == 'bi' || ($gender == 'female' && $pref == 'homo'))
                return true;
            return false;
        }
        if ($userGender == 'male' && $userPref == 'hetero')
        {
            if ($gender == 'female' && $pref != 'homo')
                return true;
            return false;
        }
        if ($userGender == 'male' && $userPref == 'homo')
        {
            if ($gender == 'male' && $pref != 'hetero')
                return true;
            return false;
        }
        if ($userGender == 'male' && $userPref == 'bi')
        {
            if ($pref == 'bi' || ($gender == 'male' && $pref == 'homo'))
                return true;
            return false;
        }
    }

    public function blockedUser($userId, $target)
    {
        $db = new Model;
        $db = $db->connect();
        $sql = $db->select()->from('blocks')->where('whoBlock', '=', $userId)->where('target', '=', $target);
        $exec = $sql->execute();
        $fromDb = $exec->fetch();
        if ($fromDb == false) {
            return false;
        }
        return true;
    }

    public function getDistance($lat1, $lon1, $lat2, $lon2) {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $kilometres = $dist * 60 * 1.1515 * 1.609344;
        return $kilometres;

    }

    public function getUsers($request, $response)
    {
        $db = new Model;
        $db = $db->connect();

        $userId = $request->getParam('userId');
        $sql = $db->select()->
        from('users')->
        join('profiles', 'users.userId', '=', 'profiles.user')->
        where('userId', '=', $userId);
        $exec = $sql->execute();
        $fromDb1 = $exec->fetch();
        $userLat = $fromDb1['latitude'];
        $userLong = $fromDb1['longetude'];
        $userGender = $fromDb1['sex'];
        $userPref = $fromDb1['sexPref'];

        $maxDistance = $request->getParam('searchDistance');
        $fameRate = $request->getParam('searchFR');
        $fameRateMin = $fameRate['min'];
        $fameRateMax = $fameRate['max'];
        $age = $request->getParam('searchAge');
        $ageMin = $age['min'];
        $ageMax = $age['max'];
        $tagsSearch = $request->getParam('tags');
        $sql = $db->
        select()->
        from('profiles')->
        join('users', 'users.userId', '=', 'profiles.user')->
        whereBetween('fameRate', array($fameRateMin, $fameRateMax))->
        whereBetween('age', array($ageMin, $ageMax));
        $exec = $sql->execute();
        $fromDb = $exec->fetchAll();
        foreach ($fromDb as $key => $item) {
            if ($userId == $item['userId']) {
                unset($fromDb[$key]);
            }
            else if ($this->blockedUser($userId, $item['userId'])){
                unset($fromDb[$key]);
            }
            else if ($this->genderPref($userGender, $userPref, $item['sex'], $item['sexPref']) == false) {
               unset($fromDb[$key]);
            }
            else if ($tagsSearch[0] != "")
            {
                $tags = explode(' ', $item['tags']);
                foreach($tagsSearch as $tag)
                {
                    if (in_array($tag, $tags) == false)
                    {
                        unset($fromDb[$key]);
                        break ;
                    }
                }
            }
            else
                { $distance = $this->getDistance($userLat, $userLong, $item['latitude'], $item['longetude']);
                $fromDb[$key]['distance'] = round($distance);
                if ($distance > $maxDistance)
                    unset($fromDb[$key]);
                }

        }
//        foreach ($fromDb as $key => $value)
//        {
//            $fromDb[$key]['tags'] = explode("," , $request->getParam('tags'));
//            $fromDb = array_values($fromDb);
//        }
        $fromDb = array_values($fromDb);
        $result->userData = $fromDb;
        return json_encode($result);
    }


}
