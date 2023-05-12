package com.codestates.julsinsa.item.service;

import com.codestates.julsinsa.exception.BusinessLogicException;
import com.codestates.julsinsa.exception.ExceptionCode;
import com.codestates.julsinsa.item.entity.Favorite;
import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.item.repository.ItemRepository;
import com.codestates.julsinsa.member.entity.Member;
import com.codestates.julsinsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;


    // 최신순 정렬
    public Page<Item> findItems(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("itemId").descending()));
    }

    //판매순 정렬
    public Page<Item> findItemsBySales(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("sales").descending()));
    }

    //할인율 정렬
    public Page<Item> findItemsByDiscountRate(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("discountRate").descending()));
    }

    //높은 가격순 정렬
    public Page<Item> findItemsByHighPrice(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("price").descending()));
    }
    // 낮은 가격순 정렬
    public Page<Item> findItemsByLowPrice(int page,int size) {
        return itemRepository.findAll(PageRequest.of(page-1,size, Sort.by("price").ascending()));
    }

    // 카테고리별 술 찾기
    public Page<Item> findItemsByCategory(int page,int size,String category) {
        return itemRepository.findAllByCategories(category,PageRequest.of(page-1,size, Sort.by("itemId").descending()));
    }

    // 술 검색
    public Page<Item> searchByTitle(int page, int size, String title) {
        if(title == null) title = "";

        return itemRepository.findAllByTitleKorContaining(title,PageRequest.of(page-1,size,Sort.by("itemId").descending()));
    }

    // 술 상세 조회
    public Item findItem(long itemId){
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        return optionalItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

    // 찜 하기
    public Item createFavorite(long itemId){

        Item findItem = findVerifedItem(itemId);

        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        // 찜이 이미 되있는 경우 Exception 호출
        for(Favorite favorite : findmember.getFavorites()){
            if(favorite.getItem().getItemId() == findItem.getItemId()) {
                throw new BusinessLogicException(ExceptionCode.LIKE_NOT_TWICE);
            }
        }

        itemRepository.upFavorite(findItem.getItemId(), findmember.getMemberId());

        return findItem;
    }


    // 찜 취소
    public Item cancleFavorite(long itemId) {
        Item findItem = findVerifedItem(itemId);

        // 로그인한 유저 불러오기
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> findbyEmailMember = memberRepository.findByEmail(principal);
        Member findmember = findbyEmailMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        findItem.getFavorites().stream()
                .filter(f -> f.getMember() == findmember)
                .findFirst().orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_CANCEL));

        itemRepository.downFavorite(findItem.getItemId(), findmember.getMemberId());

        return findItem;
    }
    private Item findVerifedItem(long itemId){
        Optional<Item> findByItem = itemRepository.findById(itemId);
        return findByItem.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ITEM_NOT_FOUND));
    }

}
